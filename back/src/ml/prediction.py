import torch.nn as nn
import torch
from torchvision import transforms

import math
import io
import sys
import base64
import json

import numpy as np

from PIL import Image


def conv_bn(inp, oup, stride):
    return nn.Sequential(
        nn.Conv2d(inp, oup, 3, stride, 1, bias=False),
        nn.BatchNorm2d(oup),
        nn.ReLU6(inplace=True)
    )


def conv_1x1_bn(inp, oup):
    return nn.Sequential(
        nn.Conv2d(inp, oup, 1, 1, 0, bias=False),
        nn.BatchNorm2d(oup),
        nn.ReLU6(inplace=True)
    )


def make_divisible(x, divisible_by=8):
    import numpy as np
    return int(np.ceil(x * 1. / divisible_by) * divisible_by)


class InvertedResidual(nn.Module):

    def __init__(self, inp, oup, stride, expand_ratio):
        super(InvertedResidual,self).__init__()
        self.stride = stride
        assert stride in [1,2]

        hidden_dim = int(inp * expand_ratio)  # expansion channel
        self.use_res_connect = self.stride == 1 and inp == oup  # skip connection이 가능한지 확인 True or False
        
        if expand_ratio == 1:
            self.conv = nn.Sequential(
                # 확장시킬 필요가 없기 때문에 바로 depth wise conv
                nn.Conv2d(hidden_dim, hidden_dim, 3, stride, 1, groups=hidden_dim, bias=False),
                nn.BatchNorm2d(hidden_dim),
                nn.ReLU6(inplace=True),
                # pw-linear
                nn.Conv2d(hidden_dim, oup, 1, 1, 0, bias=False),
                nn.BatchNorm2d(oup)
            )
        else:
            self.conv = nn.Sequential(
                # pw(확장)
                nn.Conv2d(inp, hidden_dim, 1, 1, 0, bias=False),
                nn.BatchNorm2d(hidden_dim),
                nn.ReLU6(inplace=True),
                # dw
                nn.Conv2d(hidden_dim, hidden_dim, 3, stride, 1, groups=hidden_dim, bias=False),
                nn.BatchNorm2d(hidden_dim),
                nn.ReLU6(inplace=True),
                # pw-linear(축소)
                nn.Conv2d(hidden_dim, oup, 1, 1, 0, bias=False),
                nn.BatchNorm2d(oup)
            )

    def forward(self, x):
        if self.use_res_connect:
            return x + self.conv(x)  # skip connection (element wise sum)
        else:
            return self.conv(x)


class MobileNetV2(nn.Module):

    def __init__(self, n_class=1000, input_size=224, width_mult=1.):
        super(MobileNetV2, self).__init__()
        block = InvertedResidual
        input_channel = 32
        last_channel = 1280

        interverted_residual_setting = [
            # t, c, n, s
            # t : expand ratio
            # c : channel
            # n : Number of iterations
            # s : stride
            [1, 16, 1, 1],
            [6, 24, 2, 2],
            [6, 32, 3, 2],
            [6, 64, 4, 2],
            [6, 96, 3, 1],
            [6, 160, 3, 2],
            [6, 320, 1, 1]
        ]

        # building first layer
        assert input_size % 32 == 0
        # input_channel = make_divisible(input_channel * width_mult)
        self.last_channel = make_divisible(last_channel * width_mult) if width_mult > 1.0 else last_channel
        self.features = [conv_bn(3, input_channel, 2)]  # feature들을 담을 리스트에 first layer 추가

        # building inverted residual blocks
        for t, c, n, s in interverted_residual_setting:
            output_channel = make_divisible(c * width_mult) if t > 1 else c
            for i in range(n):
                if i == 0:
                    self.features.append(block(input_channel, output_channel, s, t))
                else:
                    self.features.append(block(input_channel, output_channel, 1, t))  # 반복되는 부분에서 skip connection 가능
                input_channel = output_channel
        # building last several layers
        self.features.append(conv_1x1_bn(input_channel, self.last_channel))  # (batch, 320, 7, 7) -> (batch, 1280, 7, 7)
        # make it nn.Sequential
        self.features = nn.Sequential(*self.features)

        # Average pooling layer
        self.avg = nn.AvgPool2d(7, 7)
        # building classifier
        self.classifier = nn.Linear(self.last_channel, n_class)

        self._initialize_weights()

    def forward(self, x):
        # pdb.set_trace()
        x = self.features(x)
        x = self.avg(x)
        x = x.view(-1, self.last_channel)
        x = self.classifier(x)
        return x

    # 초기 weight 설정
    def _initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                n = m.kernel_size[0] * m.kernel_size[1] * m.out_channels
                m.weight.data.normal_(0, math.sqrt(2. / n))
                if m.bias is not None:
                    m.bias.data.zero_()
            elif isinstance(m, nn.BatchNorm2d):
                m.weight.data.fill_(1)
                m.bias.data.zero_()
            elif isinstance(m, nn.Linear):
                n = m.weight.size(1)
                m.weight.data.normal_(0, 0.01)
                m.bias.data.zero_()


def mobilenet_v2(pretrained=True):
    model = MobileNetV2(width_mult=1)

    if pretrained:
        try:
            from torch.hub import load_state_dict_from_url
        except ImportError:
            from torch.utils.model_zoo import load_url as load_state_dict_from_url
        state_dict = load_state_dict_from_url(
            'https://www.dropbox.com/s/47tyzpofuuyyv1b/mobilenetv2_1.0-f2a8633.pth.tar?dl=1', progress=True)

        model.load_state_dict(state_dict)
    return model

def setModel():
    model = torch.load('./src/ml/model.pt', map_location=torch.device('cpu'))
    model.eval()

    return model

def setDevice():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    return device

def getPrediction(imagePath, device, model, classes):
    # image = Image.open(io.BytesIO(imageData)).convert('RGB')
    image = Image.open('./src/ml/predictionImages/' + imagePath).convert('RGB')
    classes

    transforms_test = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize((.5, .5, .5), (.5, .5, .5))
    ])

    image = transforms_test(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        _, preds = torch.max(outputs, 1)

    return classes[preds[0]]

def loadClassNames():
  with open('./src/ml/classes.json', 'r', encoding='UTF-8') as f:
    data = json.load(f)

    return data['classes']

if __name__ == '__main__':
  fileName = sys.argv[1]
  
  classes = loadClassNames()
  device = setDevice()
  model = setModel()
  result = getPrediction(fileName, device, model, classes)

  print(base64.b64encode(result.encode('utf-8')))

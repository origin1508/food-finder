import {
  BsPeopleFill,
  BsMapFill,
  BsCalendarDateFill,
  BsSearch,
  BsFillBellFill,
  BsSuitHeartFill,
  BsPlusLg,
  BsImage,
} from 'react-icons/bs';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { FaCrown } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BiCloudUpload, BiRefresh } from 'react-icons/bi';
import { GrFormPrevious, GrFormNext, GrClose } from 'react-icons/gr';
import { FcPlus } from 'react-icons/fc';
import { AiOutlineUpload } from 'react-icons/ai';

interface CustomIconProps {
  name: string;
  size: string;
  color?: string;
}

const CustomIcon = ({ name, size, color }: CustomIconProps) => {
  function getIconComponent() {
    switch (name) {
      case 'people':
        return <BsPeopleFill size={size} color={color} />;

      case 'map':
        return <BsMapFill size={size} color={color} />;

      case 'date':
        return <BsCalendarDateFill size={size} color={color} />;

      case 'toggleDown':
        return <VscTriangleDown size={size} color={color} />;

      case 'toggleUp':
        return <VscTriangleUp size={size} color={color} />;

      case 'searchIcon':
        return <BsSearch size={size} color={color} />;

      case 'like':
        return <BsSuitHeartFill size={size} color={color} />;
      case 'bell':
        return <BsFillBellFill size={size} color={color} />;

      case 'send':
        return <FiSend size={size} color={color} />;

      case 'crown':
        return <FaCrown size={size} color={color} />;

      case 'refresh':
        return <BiRefresh size={size} color={color} />;

      case 'plus':
        return <BsPlusLg size={size} color={color} />;

      case 'plusCircle':
        return (
          <FcPlus
            size={size}
            color={color}
            style={{ display: 'inline-box', verticalAlign: 'top' }}
          />
        );

      case 'prev':
        return <GrFormPrevious size={size} color={color} />;

      case 'next':
        return <GrFormNext size={size} color={color} />;

      case 'upload':
        return <AiOutlineUpload size={size} color={color} />;

      case 'imageUpload':
        return <BsImage size={size} color={color} />;

      case 'close':
        return <GrClose size={size} color={color} />;

      default:
        console.log('Not implemented!');
        return;
    }
  }
  return <>{getIconComponent()}</>;
};

export default CustomIcon;

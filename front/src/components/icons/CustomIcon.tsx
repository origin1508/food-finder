import {
  BsPeopleFill,
  BsMapFill,
  BsCalendarDateFill,
  BsSearch,
  BsFillBellFill,
  BsSuitHeartFill,
  BsPlusLg,
} from 'react-icons/bs';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { FaCrown } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BiCloudUpload, BiRefresh } from 'react-icons/bi';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { FcPlus } from 'react-icons/fc';

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
        return <VscTriangleDown size={size} color={color}></VscTriangleDown>;

      case 'toggleUp':
        return <VscTriangleUp size={size} color={color}></VscTriangleUp>;

      case 'searchIcon':
        return <BsSearch size={size} color={color}></BsSearch>;

      case 'like':
        return <BsSuitHeartFill size={size} color={color}></BsSuitHeartFill>;

      case 'bell':
        return <BsFillBellFill size={size} color={color}></BsFillBellFill>;

      case 'send':
        return <FiSend size={size} color={color}></FiSend>;

      case 'crown':
        return <FaCrown size={size} color={color}></FaCrown>;

      case 'upload':
        return <BiCloudUpload size={size} color={color}></BiCloudUpload>;

      case 'refresh':
        return <BiRefresh size={size} color={color}></BiRefresh>;

      case 'plus':
        return <BsPlusLg size={size} color={color}></BsPlusLg>;

      case 'plusCircle':
        return (
          <FcPlus
            size={size}
            color={color}
            style={{ display: 'inline-box', verticalAlign: 'top' }}
          ></FcPlus>
        );

      case 'prev':
        return <GrFormPrevious size={size} color={color}></GrFormPrevious>;

      case 'next':
        return <GrFormNext size={size} color={color}></GrFormNext>;

      default:
        console.log('Not implemented!');
        return;
    }
  }
  return <>{getIconComponent()}</>;
};

export default CustomIcon;

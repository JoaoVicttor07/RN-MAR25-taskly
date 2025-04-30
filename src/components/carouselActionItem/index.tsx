import { TouchableOpacity, Text, ImageSourcePropType, Image } from 'react-native';
import style from './style';

type Props = {
    title: string;
    icon: ImageSourcePropType;
  };

  export function CarouselActionItem({ title, icon }: Props) {
    return (
      <TouchableOpacity style={style.container} >
        <Text style={style.title}>{title}</Text>
        <Image source={icon} style={style.icon} />
      </TouchableOpacity>
    );
 }
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps, SvgXml } from 'react-native-svg';

import { Colors } from '../../ComponentLibrary/styles';
import InfoCircleIcon from '../../../assets/icons/infoCircleSolid.svg';
import CheckCircleIcon from '../../../assets/icons/checkCircleSolid.svg';
import ExclamationCircleIcon from '../../../assets/icons/exclamationCircle.svg';
import TimesCircleIcon from '../../../assets/icons/exclamationCircle.svg';
import { svgs } from './svgs';

export type IconName =
  | 'info-circle'
  | 'check-circle'
  | 'exclamation-circle'
  | 'times-circle'
  | null;

interface Props {
  name: IconName;
  size: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Icon: React.FC<Props> = ({ name, size, color = Colors.white, style }) => {
  let xmlString = '';

  switch (name) {
    case 'check-circle':
      xmlString = svgs.checkCircleIcon;
      break;

    case 'exclamation-circle':
      xmlString = svgs.exclamationCircleIcon;
      break;

    case 'info-circle':
      xmlString = svgs.infoCircleIcon;
      break;

    case 'times-circle':
      xmlString = svgs.timesCircleIcon;
      break;

    default:
      break;
  }

  return <SvgXml xml={xmlString} width={size} height={size} color={color} style={style} />;
};

export default Icon;

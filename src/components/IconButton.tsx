import { MaterialIcons } from '@expo/vector-icons';
import color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import styled, { useTheme } from 'styled-components/native';

// Define prop interfaces for styled components
interface IconButtonContainerProps {
  center?: boolean;
}

// Define props interface for IconButton
interface IconButtonProps {
  onPress?: () => void;
  hasIndicator?: boolean;
  hasOutline?: boolean;
  iconName: string;
  style?: any;
  to?: string;
  size?: number;
}

const IconButtonContainer = styled(LinearGradient)<IconButtonContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  justify-content: center;
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
`;

const Icon = styled(MaterialIcons)`
  background-color: transparent;
  color: ${({ theme }) => color(theme.primaryTextColor).alpha(0.9).rgb().string()};
`;

const IconButtonIndicator = styled.View`
  background-color: red;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: absolute;
  top: -5px;
  right: -5px;
  border-width: 3px;
  border-color: ${({ theme }) => color(theme.backgroundColor).darken(0.25).rgb().string()};
`;

const IconButton = ({
  onPress,
  hasIndicator,
  hasOutline,
  iconName,
  style,
  to,
  size = 28,
}: IconButtonProps) => {
  const theme = useTheme();

  const content = (
    <IconButtonContainer
      center={hasOutline}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        color(theme.cardBackgroundColor)
          .darken(0.3)
          .alpha(hasOutline ? 0.4 : 0)
          .rgb()
          .string(),
        color(theme.cardBackgroundColor)
          .darken(0.2)
          .alpha(hasOutline ? 0.3 : 0)
          .rgb()
          .string(),
      ]}>
      <Icon size={hasOutline ? 22 : size} name={iconName as any} />
      {hasIndicator ? <IconButtonIndicator /> : null}
    </IconButtonContainer>
  );
  return to ? (
    <TouchableOpacity style={{ zIndex: 5 }}>
      <Link to={to}>{content}</Link>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={style} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

export default IconButton;

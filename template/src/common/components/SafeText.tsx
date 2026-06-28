import React from 'react';
import {Text, TextProps} from 'react-native';
import {ensureString} from '../../core/utils/stringUtils';

interface SafeTextProps extends TextProps {
  children: React.ReactNode;
}

export const SafeText: React.FC<SafeTextProps> = ({children, ...props}) => {
  // Process children to ensure all text nodes are strings
  const processChildren = (node: React.ReactNode): React.ReactNode => {
    // If it's a string or number, it's safe
    if (typeof node === 'string' || typeof node === 'number') {
      return node;
    }

    // If it's null or undefined, return empty string
    if (node === null || node === undefined) {
      return '';
    }

    // If it's a React element, process its children
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{children?: React.ReactNode}>;
      return React.cloneElement(
        element,
        element.props,
        React.Children.map(element.props.children, processChildren),
      );
    }

    // If it's an array, process each item
    if (Array.isArray(node)) {
      return node.map(processChildren);
    }

    // For any other value (objects, etc.), convert to string
    return ensureString(node);
  };

  return <Text {...props}>{processChildren(children)}</Text>;
};

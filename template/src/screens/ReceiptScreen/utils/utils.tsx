import React from 'react';
import {View, TextStyle, Image} from 'react-native';
import {RTLAwareText} from '../../../common/components/RTLAwareText';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {scaleWidth} from '../../../core/theme/scaling';
import {ImageResources} from '../../../common/ImageResources.g';
import {scaleHeight} from '../../../core/theme/scaling';

export function getTextStyle(type: string, theme: any) {
  switch (type) {
    case 'body':
      return {
        value: {
          ...theme.text.body2,
          width: '60%',
          textAlign: 'left',
        },
        label: {
          ...theme.text.body2,
          width: '40%',
          textAlign: 'right',
        },
        container: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      };
    case 'header1':
      return {
        value: {
          ...theme.text.body2,
          width: '100%',
          textAlign: 'center',
        },
        label: {},
        container: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };
    case 'header2':
      return {
        value: {
          ...theme.text.body2,
          width: '100%',
          textAlign: 'center',
        },
        label: {},
        container: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };
    case 'description':
      return {
        value: {
          ...theme.text.body2,
          width: '100%',
          textAlign: 'center',
        },
        label: {
          ...theme.text.body2,
          width: '100%',
          textAlign: 'center',
        },
        container: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };
    case 'body_title':
      return {
        value: {
          ...theme.text.body1,
          width: '60%',
          textAlign: 'left',
        },
        label: {
          ...theme.text.body1,
          width: '40%',
          textAlign: 'right',
        },
        container: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      };
  }
}

export function getSeparator(type: string, theme: any) {
  switch (type) {
    default:
      return (
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: theme.colors.mutedLavender,
            marginVertical: CommonSizes.spacing.medium,
          }}
        />
      );
    case 'image':
      return (
        <Image
          style={{
            width: scaleWidth(292),
            height: scaleHeight(66),
            alignSelf: 'center',
            tintColor:
              theme.mode === 'dark'
                ? theme.colors.mutedLavender
                : theme.colors.black,
          }}
          source={ImageResources.receipt_logo}
        />
      );
    case 'body':
      return <></>;
    case 'header1':
      return <></>;
    case 'header2':
      return <></>;
  }
}

export function getLabel(type: string, label: string, theme: any) {
  switch (type) {
    default:
      return (
        <RTLAwareText style={getTextStyle(type, theme)?.label as TextStyle}>
          {label}
        </RTLAwareText>
      );
    case 'description':
      return !!!label ? (
        <></>
      ) : (
        <RTLAwareText style={getTextStyle(type, theme)?.label as TextStyle}>
          {label}
        </RTLAwareText>
      );
    case 'header1':
      return <></>;
    case 'header2':
      return <></>;
  }
}

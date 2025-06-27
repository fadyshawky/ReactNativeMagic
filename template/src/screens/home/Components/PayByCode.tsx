import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {RTLAwareView} from '../../../common/components/RTLAwareView';
import {CommonSizes} from '../../../core/theme/commonSizes';
import {PrimaryTextInput} from '../../../common/components/PrimaryTextInput';
import {useTheme} from '../../../core/theme/ThemeProvider';
import {PrimaryButton} from '../../../common/components/PrimaryButton';
import {ButtonType} from '../../../../types';
import {useAppDispatch} from '../../../core/store/reduxHelpers';
import {getServiceById} from '../../../core/store/Services/servicesActions';
import {getProviderById} from '../../../core/store/Providers/providersActions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/types';
import {useTranslation} from '../../../common/localization/LocalizationProvider';

export function PayByCode({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}): JSX.Element {
  const {theme} = useTheme();
  const t = useTranslation();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getService = async () => {
    if (!code) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await dispatch(
        getServiceById({data: {BillTypeCode: code}}),
      );
      if (response.type.includes('fulfilled')) {
        const providerResponse = await dispatch(
          getProviderById({
            data: {BillerId: response.payload.service.BillerId},
          }),
        );
        if (providerResponse.type.includes('fulfilled')) {
          setCode('');
          onClose();
          setTimeout(() => {
            navigation.navigate('SingleService', {
              serviceID: undefined,
            });
          }, 200);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onRequestClose={onClose}
      visible={isVisible}
      transparent
      style={styles.modal}>
      <RTLAwareView
        style={{
          ...styles.container,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.indigoBlue,
        }}>
        <PrimaryTextInput
          value={code}
          onChangeText={setCode}
          placeholder={t('enterCode', 'home')}
        />
        <RTLAwareView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <PrimaryButton
            disabled={isLoading}
            isLoading={isLoading}
            onPress={() => {
              onClose();
              setCode('');
            }}
            style={{width: '48%'}}
            label={t('cancel', 'home')}
            type={ButtonType.solid}
          />
          <PrimaryButton
            disabled={isLoading}
            isLoading={isLoading}
            onPress={getService}
            style={{width: '48%'}}
            label={t('search', 'home')}
            type={ButtonType.solid}
          />
        </RTLAwareView>
      </RTLAwareView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '95%',
    // minHeight: '40%',
    alignSelf: 'center',
    borderRadius: CommonSizes.borderRadius.large,
    padding: CommonSizes.spacing.large,
    gap: CommonSizes.spacing.large,
    marginTop: '45%',
  },
});

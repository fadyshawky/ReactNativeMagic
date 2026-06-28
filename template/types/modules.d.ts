// Ambient shims for JS packages without bundled or @types declarations.
// This file MUST stay a script (no top-level import/export) so these act as
// ambient module declarations, giving the imports an implicit `any` type.
declare module 'lodash';
declare module 'lodash/omit';
declare module 'intl';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/Icon';

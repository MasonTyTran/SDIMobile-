import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';

import {IconLabel, SDIImage, TextView} from '@components';
import {Colors, FontSize, GridStyles, TextStyles} from '@resources';

import {AssetInfoProps} from './types';
import {AssetDataSource, AssetInformation} from '@data';
import {useUser} from '@hooks';
import {ScrollView} from 'react-native-gesture-handler';

const KeyValueLabel = ({title, value}: {title: string; value: string}) => {
  return (
    <>
      <View style={{marginTop: FontSize.md}} />

      <View style={[GridStyles.row]}>
        <TextView style={styles.keyTitle} text={`${title} `} />
        <TextView style={styles.keyValue} text={value} />
      </View>
    </>
  );
};

export const AssetInfo: React.FC<AssetInfoProps> = ({item}) => {
  const user = useUser();

  const [data, setData] = React.useState<AssetInformation>();
  React.useEffect(() => {
    AssetDataSource.assetInfo({
      id: item.id,
      user_id: user.id,
      organization_id: user.organizationID,
    }).subscribe({
      next: (res) => {
        setData(res.Data);
      },
    });
  }, [item.id, user.id, user.organizationID]);
  return (
    <ScrollView style={styles.container}>
      <TextView style={styles.title} text="Thông tin tài sản" />

      <View style={styles.infoContainer}>
        <View style={GridStyles.row}>
          <View style={[styles.info, {}]}>
            <KeyValueLabel title={'Tên: '} value={item.table_name} />
            <KeyValueLabel title={'Mã vị trí: '} value={`#${item.geom}`} />
            <KeyValueLabel title={'Mã thiết bị: '} value={`#${item.id}`} />
          </View>
          <View style={{width: '30%'}}>
            <IconLabel
              prefix={
                <Icon
                  color={Colors.accent}
                  name="alert-circle-outline"
                  type="ionicon"
                />
              }
              color={Colors.accent}
              text={`${item.is_f ? 'Đang hoạt động' : 'Ngừng hoạt động'}`}
            />
            <SDIImage
              fileID={data?.id ?? ''}
              source={{
                uri:
                  'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
              }}
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <TextView style={styles.title} text="Thông số kĩ thuật" />
      {data?.info.map((x) => {
        return <KeyValueLabel key={x.field} value={x.value} title={x.field} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    ...TextStyles.title,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  info: {
    flex: 1,
    paddingRight: 16,
  },
  id: {
    ...TextStyles.normal,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 50,
  },

  divider: {
    marginVertical: 30,
  },
  keyTitle: {
    fontWeight: 'bold',
    color: Colors.gray,
  },
  keyValue: {flex: 1},
});

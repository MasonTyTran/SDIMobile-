import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Header, Icon, ListItem} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {AssetDetailProps} from './types';
import {AssetInfo} from './AssetInfo';
import {AddIssue} from './AddIssue';

export const AssetDetail: React.FC<AssetDetailProps> = (props) => {
  const {navigation} = props;
  const asset = props.route.params.asset;
  const [addVisible, setAddVisible] = React.useState(false);

  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={() => props.navigation.pop()}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text="Chi tiết tài sản" style={styles.header} />
        }
        rightComponent={
          <TextView
            onPress={() =>
              navigation.navigate('IssueList', {
                id: asset.id,
                tableId: asset.tableid,
              })
            }
            text="Sự kiện"
            style={styles.issue}
          />
        }
        backgroundColor={Colors.gray}
      />
      <AssetInfo item={asset} />
      {addVisible || (
        <TouchableOpacity
          onPress={() => setAddVisible(true)}
          style={styles.fab}>
          <ListItem.Title style={{color: 'white'}}>Thêm sự kiện</ListItem.Title>
        </TouchableOpacity>
      )}
      <AddIssue
        id={asset.id}
        onRequestClose={() => setAddVisible(false)}
        visible={addVisible}
      />
    </>
  );
};

const FABSize = 65;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  issue: {
    color: 'white',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 36,
    right: 36,
    height: FABSize,
    paddingHorizontal: 16,
    borderRadius: FABSize * 0.5,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {backgroundColor: 'white'},
});

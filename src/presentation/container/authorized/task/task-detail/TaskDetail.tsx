import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';
import {useUser} from '@hooks';

import {TaskDetailProps} from './types';
import {TaskInfo} from './TaskInfo';
import {WODataSource, WOProject} from '@data';

export const TaskDetail: React.FC<TaskDetailProps> = (props) => {
  const {project} = props.route.params;
  const user = useUser();
  const [data, setData] = React.useState<WOProject>();
  const fetch = React.useCallback(async () => {
    try {
      const res = await WODataSource.project({
        user_id: user.id,
        organization_id: user.organizationID,
        oid: project.oid.toString(),
      }).toPromise();
      setData(res.Data);
    } catch (error) {}
  }, [project.oid, user.id, user.organizationID]);
  React.useEffect(() => {
    fetch();
  }, [fetch]);
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
          <TextView text={'Chi tiết công việc'} style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      {data ? <TaskInfo onUpdate={fetch} item={data} /> : <ActivityIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});

import {AssetDataSource, WODataSource} from '@data';
import {useUser} from '@hooks';
import {useNavigation} from '@react-navigation/native';

export function useItem() {
  const user = useUser();
  const {navigate} = useNavigation();
  const getProject = async (id: string) => {
    const data = await WODataSource.project({
      oid: id,
      organization_id: user.organizationID,
      user_id: user.id,
    }).toPromise();
    navigate('TaskDetail', {
      project: data.Data,
    });
  };
  const getAsset = async (id: string) => {
    const data = await AssetDataSource.assetInfo({
      id: id,
      organization_id: user.organizationID,
      user_id: user.id,
    }).toPromise();
    navigate('AssetDetail', {
      asset: data.Data,
    });
  };
  const getTicket = async (id: string) => {
    const data = await WODataSource.project({
      oid: id,
      organization_id: user.organizationID,
      user_id: user.id,
    }).toPromise();
    navigate('TaskDetail', {
      project: data.Data,
    });
  };
  const getItemDetail = (type: 'project' | 'asset' | 'ticket', id: string) => {
    console.log(type);
    if (type === 'project') {
      return getProject(id);
    }
    if (type === 'asset') {
      return getAsset(id);
    }
    return getTicket(id);
  };
  return {getItemDetail};
}

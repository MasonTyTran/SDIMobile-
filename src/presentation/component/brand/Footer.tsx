import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TextView} from '../label';
import {AssetDataSource, OrganizationConfig} from '@data';
export const Footer = ({
  color = 'black',
  hasG = true,
}: {
  color?: string;
  hasG?: boolean;
}) => {
  const [config, setConfig] = React.useState<OrganizationConfig>();
  React.useEffect(() => {
    const get = () => {
      AssetDataSource.getOrgConfig().subscribe({
        next: (data) => {
          setConfig(data.Data);
        },
        error: console.warn,
      });
    };
    get();
  }, []);
  console.log(config?.logo_url);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: config?.logo_url}}
        resizeMode="contain"
      />
      <TextView style={[styles.version, {color}]} text={`${config?.version}`} />
      {hasG && (
        <TextView
          style={[styles.g, {color}]}
          text={`${config?.title_footer}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  version: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  g: {
    color: 'white',
  },
});

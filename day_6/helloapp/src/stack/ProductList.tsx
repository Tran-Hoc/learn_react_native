import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

import products from './ListProduct';

type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
};

import { Pressable } from 'react-native';

function ProductItem({
  item,
  itemWidth,
  onPress,
}: {
  item: Product;
  itemWidth: number;
  onPress: any;
}) {
  return (
    <Pressable style={[styles.card, { width: itemWidth }]} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>
        {item.id}. {item.name}
      </Text>
      <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>
      <Text style={styles.discount}>-{item.discount}%</Text>
    </Pressable>
  );
}

import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { RootStackParamList, TabParamList } from '../nested/nested';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProductListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Product'>,
  NativeStackScreenProps<RootStackParamList>
>;

function ProductScreen({ navigation }: ProductListScreenProps) {
  const { width, height } = useWindowDimensions(); // auto listen when change orientation
  const isLandScape = width > height;
  const numColumns = isLandScape ? 3 : 2;

  const itemSpacing = 10;
  const itemWidth = (width - itemSpacing * (numColumns + 1)) / numColumns;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={numColumns}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            itemWidth={itemWidth}
            onPress={() =>
              navigation.navigate('ProductDetail', { id: item.id })
            }
          />
        )}
        numColumns={numColumns}
        contentContainerStyle={{ padding: itemSpacing }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: itemSpacing,
        }}
      />
    </SafeAreaView>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#725CAD',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
  },
  price: {
    fontSize: 13,
    color: '#FF5733',
  },
  discount: {
    fontSize: 12,
    color: '#888',
  },
});

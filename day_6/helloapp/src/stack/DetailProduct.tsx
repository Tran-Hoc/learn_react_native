import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import products from './ListProduct';
import { RootStackParamList } from '../nested/nested';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type DetailProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export default function ProductDetail({
  route,
  navigation,
}: DetailProductScreenProps) {
  const { id } = route.params || {};

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.text_not_found}>No product found</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Product Detail</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>Name: {product.name}</Text>
      <Text style={styles.price}>Price: {product.price.toLocaleString()}₫</Text>
      <Text style={styles.discount}>Discount: {product.discount}%</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1D51',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#0B1D51',
  },
  text_not_found: { color: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#8CCDEB' },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#FFE3A9',
  },
  price: { fontSize: 16, color: 'green', marginVertical: 4 },
  discount: { fontSize: 16, color: 'red', marginVertical: 4 },
  image: { width: '90%', height: 300, borderRadius: 5, marginBottom: 5 },
});

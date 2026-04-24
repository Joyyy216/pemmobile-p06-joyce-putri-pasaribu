import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, isGrid }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isGrid && styles.grid]}
      activeOpacity={0.85}
    >
      <Text style={styles.image}>{item.image}</Text>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>
        Rp {item.price.toLocaleString('id-ID')}
      </Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0f2fe',
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },

  grid: {
    width: '45%',
  },

  image: { fontSize: 30 },
  name: { fontWeight: 'bold' },
  category: { fontSize: 12 },
  price: { fontWeight: 'bold' },
  rating: { fontSize: 12 },
});
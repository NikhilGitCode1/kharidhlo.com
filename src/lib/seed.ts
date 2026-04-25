import { collection, doc, writeBatch, getDocs, query, limit } from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './mock-data';
import { handleFirestoreError, OperationType } from './firestore-errors';

export async function seedDatabase() {
  try {
    const categoriesSnap = await getDocs(query(collection(db, 'categories'), limit(1)));
    if (!categoriesSnap.empty) {
      console.log('Database already seeded.');
      return;
    }

    const batch = writeBatch(db);

    // Seed Categories
    MOCK_CATEGORIES.forEach((cat) => {
      const catRef = doc(collection(db, 'categories'), cat.id);
      batch.set(catRef, cat);
    });

    // Seed Products
    MOCK_PRODUCTS.forEach((prod) => {
      const prodRef = doc(collection(db, 'products'), prod.id);
      batch.set(prodRef, prod);
    });

    await batch.commit();
    console.log('Database seeded successfully.');
  } catch (error) {
    // If it's a seed check, we might just be seeing if the collections exist
    console.warn('Seeding skipped or failed:', error);
  }
}

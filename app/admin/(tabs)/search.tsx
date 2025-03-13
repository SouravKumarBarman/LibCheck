import { View, Text } from 'react-native';
import SearchResult from '@/components/searchResult';

export default function AdminSettings() {
  return (
    <SearchResult
          title="Introduction to Algorithm"
          authors={["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"]}
          edition={"3rd"}
          totalCopies={2}
          availableCopies={3}
          admin={true}
        />
  );
}

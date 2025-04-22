import { View } from 'react-native';
import { ReviewFieldsFragment } from '../__generated__/graphql';
import { Text } from './Text';
import theme from '../theme';


export const Review = ({ review }: { review: ReviewFieldsFragment; }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <View
          style={{
            borderWidth: 4,
            borderColor: theme.colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: theme.colors.primary }}>{review.rating}</Text>
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          {typeof review.createdAt === 'string' && (
            <Text color='textSecondary'>
              {review.createdAt.split('T')[0].split('-').reverse().join('.')}
            </Text>
          )}
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

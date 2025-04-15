import { Image, Pressable, View } from 'react-native';
import { Repository } from '../types';
import { Text } from './Text';
import theme from '../theme';

const toThousandNotation = (number: number): string => {
  const n = Math.abs(Math.round(number));
  if (n < 1000) {
    return `${n}`;
  }
  return `${(n / 1000).toFixed(1)}k`;
};

const NumberItem = ({ label, number }: { label: string; number: number }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text fontWeight='bold'>{toThousandNotation(number)}</Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  );
};

export const RepositoryItem = ({ repo }: { repo: Repository }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 8, gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Image
          source={{ uri: repo.ownerAvatarUrl }}
          style={{ width: 50, height: 50, borderRadius: 4 }}
        />
        <View style={{ flex: 1, rowGap: 8 }}>
          <Text fontWeight='bold' fontSize='subheading'>
            {repo.fullName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text color='textSecondary' style={{ flex: 1, flexWrap: 'wrap' }}>
              {repo.description}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 4,
                padding: 6
              }}
            >
              <Text style={{ color: 'white' }} fontWeight='bold'>
                {repo.language}
              </Text>
            </Pressable>
            <View style={{ flexGrow: 1 }}></View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <NumberItem label='Stars' number={repo.stargazersCount} />
        <NumberItem label='Forks' number={repo.forksCount} />
        <NumberItem label='Reviews' number={repo.reviewCount} />
        <NumberItem label='Rating' number={repo.ratingAverage} />
      </View>
    </View>
  );
};

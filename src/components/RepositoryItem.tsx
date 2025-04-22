import { Image, Pressable, View } from 'react-native';
import { Text } from './Text';
import theme from '../theme';
import { GetRepositoriesQuery, Repository, Review } from '../__generated__/graphql';
import { useNavigate } from 'react-router-native';
import { openURL } from 'expo-linking';
import { style } from 'twrnc';

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

interface Props {
  repo: GetRepositoriesQuery['repositories']['edges'][number]['node'];
  repoUrl?: string;
}

export const RepositoryItem = ({ repo, repoUrl }: Props) => {
  const navigate = useNavigate();

  return (
    <Pressable
      onPress={
        !repoUrl ? () => navigate(`/repositories/${repo.id}`) : null
      }
    >
      <View
        testID='repositoryItem'
        style={{ backgroundColor: 'white', padding: 8, gap: 16 }}
      >
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {repo.ownerAvatarUrl && (
            <Image
              source={{ uri: repo.ownerAvatarUrl }}
              style={{ width: 50, height: 50, borderRadius: 4 }}
            />
          )}
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
              <Text
                style={{
                  color: 'white',
                  backgroundColor: theme.colors.primary,
                  borderRadius: 4,
                  padding: 6
                }}
                fontWeight='bold'
              >
                {repo.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {repo.stargazersCount && repo.forksCount && (
            <>
              <NumberItem label='Stars' number={repo.stargazersCount} />
              <NumberItem label='Forks' number={repo.forksCount} />
            </>
          )}
          <NumberItem label='Reviews' number={repo.reviewCount} />
          <NumberItem label='Rating' number={repo.ratingAverage} />
        </View>
        {repoUrl && (
          <Pressable onPress={() => openURL(repoUrl)}>
            <Text
              style={{
                backgroundColor: theme.colors.primary,
                color: 'white',
                textAlign: 'center',
                padding: 12,
                borderRadius: 4
              }}
              fontWeight='bold'
            >
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMoodEntry = `query GetMoodEntry($id: ID!) {
  getMoodEntry(id: $id) {
    id
    mood
    date
    notes
  }
}
`;
export const listMoodEntrys = `query ListMoodEntrys(
  $filter: ModelMoodEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listMoodEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      mood
      date
      notes
    }
    nextToken
  }
}
`;

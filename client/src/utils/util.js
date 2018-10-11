export const wordAlreadySubmitted = (word, submissions)  => {
  const matches = submissions.filter(submission => {
    return submission.word === word;
  });
  return matches.length > 0;
};

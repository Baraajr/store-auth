export default {
  spec_dir: 'dist',
  spec_files: ['**/*[sS]pec.?(m)js'],
  helpers: ['helpers/**/*.?(m)js'],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false, // to run tests in order
    forbidDuplicateNames: true,
  },
};

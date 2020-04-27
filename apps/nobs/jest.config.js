module.exports = {
  name: 'nobs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nobs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

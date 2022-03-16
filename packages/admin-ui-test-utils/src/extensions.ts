import '@testing-library/jest-dom/extend-expect'
import serializer, { matchers } from 'jest-emotion'

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)

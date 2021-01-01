
import { createContentBuilder } from './content-registry'
import pack1 from './pack-001'

const builder = createContentBuilder()
builder.addPack(pack1)

export default builder.build()
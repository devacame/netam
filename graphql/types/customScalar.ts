import { asNexusMethod } from 'nexus'
import { DateResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateResolver, 'DateTime')

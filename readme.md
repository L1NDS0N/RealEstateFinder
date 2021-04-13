- This one below is a cli model to migrate data to sql that are declared in schema at ./prisma/schema.prisma file.
  `yarn prisma migrate dev --name ImoveisOlx`
  ou
  `yarn migrate ImoveisOlx`

- To visualize Data like in a Database Management Tool
  install:
  `yarn add @prisma/cli --save-dev`
  and run:
  `yarn prisma studio`

### Reasons for shared Zod schemas

Shared Zod schemas will keep a single source of truth for schemas and Zod-inferred TypeScript types. Also these schemas could be shared across different apps with a monorepo package.

To make sure the schemas are singletons at runtime in Nest, they can be dependency-injected into the module providers:
```
@Module({
  providers: [UserService, { provide: 'USER_SCHEMA', useValue: UserSchema }],
})
```
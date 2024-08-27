# nest-swagger-checker-linter
nest-swagger-checker-linter is linter version of [nest-swagger-checker](https://github.com/ozkersemih/nest-swagger-checker) package
to use it as ESLint rule.

This package uses nsc(nest-swagger-checker) package inside its own.

# configuration
Like nsc package, this linter package can be configured by using `.swautomaterc` file at the root path of project.
You can see detail of [configuration](https://github.com/ozkersemih/nest-swagger-checker?tab=readme-ov-file#configuration) 

# setup
Like other eslint plugins, this plugin needs to be added to eslintrc configuration.

```
// .eslintrc.json file in project
...
"plugins": [
  "nest-swagger-checker-lint"
],
...
"rules": {
  "nest-swagger-checker-lint/api-property-rule": "error",
  "nest-swagger-checker-lint/api-information-rule": "error",
  "nest-swagger-checker-lint/api-param-rule": "error",
....
}
```

# examples
* Lets assume you have endpoint method in a controller like below:
  ```typescript
  @Post('')
  @HttpCode(HttpStatus.OK)
  ..
  @AnotherDecorator()
  public async create(
    ...
  )
  ```
  You will get eslint error because there is no ApiOperation decorator ta describe summary and description for endpoint.

  Error should be like below:
  ![Screenshot 2024-05-19 at 17 28 19](https://github.com/ozkersemih/nest-swagger-checker-lint/assets/52029025/da894c4f-d03d-4917-8032-f9e5108c6f03)
  <br><br>
  💡 You can enable/disable this checking by setting `scopes.endpoint.information.check` config value

___

* There is a request param for endpoint method in below example but name in ApiParam decorator does not match with it.

  ```typescript
  ....
  @ApiParam({ name: 'customerId', description: 'Customer ID', type: Number, example: 60 })
  async getCount(@Param('userId') userId: string, @Query() parameters: Parameters): Promise<Count> {
    return this.service.getCount(Number(userId), parameters);
  }
  ...
  ```
  You will get eslint error like below.
  ![Screenshot 2024-05-20 at 23 29 52](https://github.com/ozkersemih/nest-swagger-checker-lint/assets/52029025/5394631f-160e-4b92-ae84-6f85b54e1328)
  <br><br>
  💡 You can enable/disable this checking by setting `scopes.endpoint.params.check` config value

___

* If you have request parameter that given with `@Param` decorator like above but you don't have any `@ApiParam` decorator, you will also get eslint error.

  ```typescript
  ....
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Request Is Not Valid' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'An Error Occurred' })
  async getCount(@Param('userId') userId: string, @Query() parameters: Paramters): Promise<Count> {
    return this.affiliateAdService.getCount(Number(userId), searchParameters);
  }
  ```
  ![Screenshot 2024-05-20 at 23 33 42](https://github.com/ozkersemih/nest-swagger-checker-lint/assets/52029025/eb6e319d-fdf1-495b-a688-c2d974a38422)
  <br><br>
  💡 You can enable/disable this checking by setting `scopes.endpoint.params.check` config value

___

* Lets assume you have a custom query class type for your endpoint endpoint method like below:

  ```typescript
   async getCount(..., @Query() parameters: Parameters): Promise<Count> {
    return this.service.getCount(Number(sellerId), parameters);
  }
  ....
  export class SearchParametersDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'Pagination Index, Default: 1',
    example: 1,
    required: false,
  })
  public pageIndex?: number;
  ....
  ```
  If you gave pattern something like that `^[A-Z][a-z0-9]*(?:\s[a-z0-9]*)*$`, you will give eslint error because your description text should be match with your pattern.

  In this example, only first words first letter should be uppercase according to example pattern. Eslint error will be like below:
  ![Screenshot 2024-05-20 at 23 50 40](https://github.com/ozkersemih/nest-swagger-checker-lint/assets/52029025/5fabba08-7f57-48cc-b776-348cfe4f2519)
  <br><br>
  💡 You can enable/disable this checking by setting `scopes.endpoint.query.description.check` config value and you can set pattern by setting `scopes.endpoint.query.description.pattern` value.


  

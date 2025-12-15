import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as path from 'path';
import sinonChai from 'sinon-chai';
import {
  Pact,
  Matchers,
  SpecificationVersion,
  LogLevel,
} from '@pact-foundation/pact';

const expect = chai.expect;
import { CatService } from '../src/api/cat-service';
const { eachLike } = Matchers;

chai.use(sinonChai);
chai.use(chaiAsPromised);
const LOG_LEVEL = process.env.LOG_LEVEL || 'DEBUG';

describe('GET /cats', () => {
  let catService: CatService;

  // Create a 'pact' between the two applications in the integration we are testing
  const provider = new Pact({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'Consumer Cat Service',
    provider: 'Provider Cat Service',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
    logLevel: LOG_LEVEL as LogLevel,
  });

  it('Should return an HTTP 200 and a list of cats', async () => {
    const catExampleData = { catList: 10 };
    const EXPECTED_BODY = eachLike(catExampleData);

    // Mocking the backend API with Pact
    await provider
      .addInteraction()
      .given('I have a list of cats')
      .uponReceiving('a request for all cats')
      .withRequest('GET', '/cats', (builder) => {
        builder.query({ from: 'today' });
        builder.headers({ Accept: 'application/json' });
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'Content-Type': 'application/json' });
        builder.jsonBody(EXPECTED_BODY);
      })
      .executeTest(async (mockserver) => {
        // CatService API client dynamically to point to the mock service Pact created for us, 
        // instead of the real one
        catService = new CatService({ url: mockserver.url });
        const response = await catService.getCats('today');

        // Assert: check the result
        expect(response.data[0]).to.deep.eq(catExampleData);
        return response;
      });
  });

  it('Should return a cat by id', async () => {
    const EXPECTED_CAT_PROFILE_BODY = Matchers.like({
      id: 1,
      name: 'Junin',
      age: 3,
    });

    // Interação para a lista de cats (GET /cats/{1})
    provider
      .addInteraction()
      .uponReceiving('a request for a cat by id')
      .withRequest('GET', '/cats/1', (builder) => {
        builder.headers({ Accept: 'application/json' });
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'Content-Type': 'application/json' });
        builder.jsonBody(EXPECTED_CAT_PROFILE_BODY);
      })
      .executeTest(async (mockserver) => {
        catService = new CatService({ url: mockserver.url });
        const response = await catService.getCatsById(1);

        // Assert: check the result
        expect(response.data).to.deep.eq(EXPECTED_CAT_PROFILE_BODY.value);

        return response;
      });
  });

  it('Should create a cat', async () => {
    const EXPECTED_CAT_PROFILE_BODY = Matchers.like({
      id: 11,
      name: 'Katara',
      age: 5,
    });

    // Interação para a lista de cats (GET /cats/{1})
    provider
      .addInteraction()
      .uponReceiving('a request for create a cat')
      .withRequest('POST', '/cats', (builder) => {
        builder.headers({ Accept: 'application/json', 'Content-Type': 'application/json' });
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'Content-Type': 'application/json' });
        builder.jsonBody(EXPECTED_CAT_PROFILE_BODY);
      })
      .executeTest(async (mockserver) => {
        catService = new CatService({ url: mockserver.url });
        const response = await catService.createCat(EXPECTED_CAT_PROFILE_BODY);

        // Assert: check the result
        expect(response.status).to.eq(200);
        expect(response.data).to.deep.eq(EXPECTED_CAT_PROFILE_BODY.value);
        
        return response;
      });
  });
});

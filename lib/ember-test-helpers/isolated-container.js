import { getResolver } from './test-resolver';
import Ember from 'ember';

export default function isolatedContainer(fullNames) {
  var resolver = getResolver();
  var container = new Ember.Container();
  container.optionsForType('component', { singleton: false });
  container.optionsForType('view', { singleton: false });
  container.optionsForType('template', { instantiate: false });
  container.optionsForType('helper', { instantiate: false });
  container.register('component-lookup:main', Ember.ComponentLookup);
  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    var normalizedFullName = resolver.normalize(fullName);
    container.register(fullName, resolver.resolve(normalizedFullName));
  }
  return container;
}

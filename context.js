class Context {
    constructor(context, label, questions, choices, answers, keywords, relation) {
        this.context = context;
        this.label = label;
        this.questions = questions;
        this.choices = choices;
        this.answers = answers;
        this.keywords = keywords;
        this.relation = relation;
    }
}

// Causal context
var causal_context1 = new Context('One type of ice movement is called deformation. Ice is brittle. If you ' +
    'hit it with a hammer, it will shatter like glass. But ice is also plastic; it can change shape without breaking. ' +
    'Now, there are a couple of factors that affect the amount of deformation that takes place or the speed of the ' +
    'glacier\'s movement, but the strength of the factors is very different. The thickness of the ice is the number ' +
    'one factor that determines the speed of the movement. Deformation is much more likely to occur the thicker the ' +
    'ice is because of the gravity of the weight of the ice.\n' +
    '\n' +
    'Another factor is temperature, though the impact of temperature is less likely and also less powerful. Temperature ' +
    'plays a role here because cold ice does not move as easily as ice that is close to the melting point. So, if you ' +
    'have a glacier in a slightly warmer region, it will flow faster than a glacier in a cooler region. \n',
    'causal1', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which factor has the strongest relationship with the deformation of the ice?'],
    [['Thickness of the ice', 'Size of the ice', 'Temperature', 'Latitude'],
        ['Thickness of the ice', 'Size of the ice', 'Temperature', 'Latitude']],
    [[1, 3], [1]],
    ['Thickness of the ice', 'Deformation', 'Temperature'],
    ['1. Thickness of the ice and deformation of the ice:', '2. Temperature and deformation of the ice:']);

var causal_context2 = new Context('The CoT starfish is found on coral reefs in the tropical Pacific Ocean, and it eats coral. \n' +
    '\n' +
    'What causes the population to increase? Over the years, we\'ve come up with a few factors that might contribute to the increase of population.\n' +
    '\n' +
    'The strongest predictor is the level of human fishing activities. Because snails eat starfish, ' +
    'particularly the giant triton snail, which is the main predator of the population of starfish. These snails have ' +
    'themselves experienced a decline in population because of overfishing by humans. So with a decline in starfish ' +
    'predators, the starfish population can increase. \n' +
    '\n' +
    'Another hypothesized human-related cause is fertilizer runoff. People use fertilizer for their crops and plants ' +
    'and a lot of it eventually makes its way from land into the seas. It\'s fertilizer, so it has a lot of nutrients. ' +
    'These nutrients have an effect on the starfish, because they cause an increase in the growth of phytoplankton. ' +
    'Phytoplankton are microscopic plants that grow in the ocean. Larval CoT starfish eat phytoplankton in their first' +
    ' month of life, so more fertilizer in the ocean means more phytoplankton, which means more starfish, bad for the reefs. \n' +
    '\n' +
    'Now, the final hypothesis that not many scholars support has to do with storm events. If some reefs are destroyed ' +
    'by storms, starfish populations that inhabited those reefs would have to condense and concentrate on the reefs ' +
    'that are left. So this can cause an increase in the population of starfish. \n' +
    '\n',
    'causal2', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which of the following factors mentioned by the article has the strongest relationship with the increase in the population of the CoT starfish?'],
    [['Fishing', 'Fertilizer runoff', 'Storm events', 'Fossil fuel consumption'],
        ['Fishing', 'Fertilizer runoff', 'Level of rainfall', 'Storm events']],
    [[1, 2, 3], [1]],
    ['Population of starfish', 'Fishing', 'Population of giant triton snail', 'Fertilizer runoff', 'Population of phytoplankton', 'Storm events', 'Reefs'],
    ['1. Fishing and population of giant triton snail:',
        '2. Population of giant triton snail and population of starfish:',
        '3. Fertilizer runoff and population of phytoplankton:',
        '4. Population of phytoplankton and population of starfish:',
        '5. Storm events and location of reefs:',
        '6. Reefs and population of starfish:'])

var causal_context3 = new Context('What can predict succulent plants\' ability to survive in the desert? \n' +
    '\n' +
    'One important ability of succulent plants is to absorb water. Obviously, opportunities to get water in the ' +
    'desert are few and far-between. Generally rains are light and short. And there\'s a limited window of time for ' +
    'any plant to get the water before it evaporates. Succulent plants have a spread-out and shallow root system ' +
    'that can quickly pull in water from the top inches of soil, though the soil has to be saturated since succulents ' +
    'aren\'t good at absorbing water from soil that\'s only a little moist.\n' +
    '\n' +
    'One perhaps even more crucial ability is succulent plants\' ability to retain water, important in an environment ' +
    'where rainy days are rare. Some important features of succulent plants help them to retain water: 1) it is ' +
    'important that they can store water in their leaves, in their stems, or in their roots. 2) to keep that moisture ' +
    'from evaporating in the hot, desert sun, most succulent plants have a waxy outer layer. That makes them almost ' +
    'waterproof when their stomachs are closed. 3) although seems trivial, succulent plants also preserve water by ' +
    'minimizing their surface area. The more of the plant that\'s out in the Sun, the more potential there is to lose ' +
    'stored-up water. And that means that most succulent plants have few, if any, leaves.',
    'causal3', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which one of the following factors mentioned by the article has the strongest relationship with succulent plants\' ability to survive in the desert?'],
    [['Spread-out and shallow root system',
        'Store water in different parts of the plant',
        'Waxy outer layer',
        'Minimized surface area'],
        ['Ability to absorb water', 'Ability to retain water', 'Color', 'Resistance to wind']],
    [[1, 2, 3, 4], [2]],
    ['Ability to survive in the desert', 'Ability to absorb water', 'Spread-out root system', 'Ability to retain water', 'Store water in different parts', 'Waxy outer layer', 'Minimized surface area'],
    ['1. Spread-out root system and ability to absorb water:',
        '2. Ability to absorb water and succulent plants\' ability to survive in the desert:',
        '3. Store water in different parts of the plant and ability to retain water:',
        '4. Waxy outer layer and ability to retain water:',
        '5. Minimized surface area and ability to retain water:',
        '6. Ability to retain water and succulent plants\' ability to survive in the desert:'])

var causal_context4 = new Context('Relationships between animal species in a given ecosystem can get pretty ' +
    'complex. Here\'s an example of an experiment conducted in an oak forest involving three different species: ' +
    'white-footed mice, gypsy moths, and oak trees. Oak trees produce acorns, and acorns are a primary food source ' +
    'for white-footed mice. Another food source for the white-footed mice is the gypsy moth. So the size of the gypsy ' +
    'moth population is controlled by the white-footed mice. \n' +
    '\n' +
    'However, aside from white-footed mice, there\'s another factor, although a lot weaker, that can influence the ' +
    'number of moths, which is the degree of effective rainfall. When there is little rain in the given year, the number ' +
    'of moths tend to also be lower. It is worth keeping in mind though the impact of rainfall is not as strong as the ' +
    'impact of the number of white-footed mice. So, in summary, the number of acorns in a given year impacts the number ' +
    'of mice, and the number of mice and rainfall precipitation in a given year impacts the number of gypsy moths.\n' +
    '\n' +
    'Now, what makes this set of relationships particularly interesting is that oak trees only produce a large ' +
    'number of acorns every few years. And when the oak trees produce a large number of acorns is very strongly ' +
    'predicted by effective rainfall in that given year. So during the years with large effective rainfall, there ' +
    'will be large amounts of acorns, the mice have more food, which leads to the white-footed mice population ' +
    'growing and the gypsy moth population decreasing. However, keep in mind that rainfall is also contributing to ' +
    'an increase in gypsy moths population!  But since the causal chain is not as strong as the impact of the number ' +
    'of mice. Eventually, in this case, we see a decrease in the gypsy moths population.',
    'causal4', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which one of the following factors mentioned by the article has the strongest relationship with gypsy moth population?'],
    [['White-footed mice population', 'Effective rainfall', 'Acorns production', 'Temperature'],
        ['Acorns production', 'White-footed mice', 'Gypsy moths population', 'Number of oak trees']],
    [[1, 2, 3], [2]],
    ['Gypsy moth population', 'White-footed mice population', 'Effective rainfall', 'Acorns production'],
    ['1. White-footed mice population and gypsy moth population:',
        '2. Effective rainfall and gypsy moth population:',
        '3. Acorns production and gypsy moth population:',
        '4. Acorns production and White-footed mice population:'])



// Associative
var associative_context1 = new Context('One type of ice movement is called deformation. Ice is brittle. ' +
    'If you hit it with a hammer, it will shatter like glass. But ice is also plastic; it can change shape without ' +
    'breaking. Now, there are a couple of factors that are associated with the amount of deformation that takes place ' +
    'or the speed of the glacier\'s movement, but the strength of the associations is very different. The size of the ' +
    'ice is the number one factor that is correlated with the speed of the movement. Deformation is much more likely ' +
    'to be observed the bigger the ice is, considering the size of the ice is associated with the gravity of the weight ' +
    'of the ice. \n' +
    '\n' +
    'Another factor is the latitude, though the association is a lot weaker. Latitude is relevant here because ' +
    'the ice movement is usually observed to be slower in a higher latitude region than a region at lower latitude. ' +
    'So, if you have a glacier in a slightly lower latitude region, it will more likely flow faster than a glacier ' +
    'in a region closer to the pole.',
    'associative1', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which factor has the strongest relationship with the deformation of the ice?'],
    [['Thickness of the ice', 'Size of the ice', 'Temperature', 'Latitude'],
        ['Thickness of the ice', 'Size of the ice', 'Temperature', 'Latitude']],
    [[2, 4], [2]],
    ['Size of the ice', 'Deformation', 'Latitude'],
    ['1. Size of the ice and deformation of the ice:', '2. Latitude and deformation of the ice:'])

var associative_context2 = new Context('The CoT starfish is found on coral reefs in the tropical Pacific Ocean ' +
    'and it eats coral.\n' +
    '\n' +
    'What is associated with the increase of the population?  Over the years, we\'ve seen a few phenomena that might be ' +
    'correlated with the increase of population. \n' +
    '\n' +
    'The strongest association we found is the level of fossil fuel consumption. The increase in ' +
    'fossil fuel consumption is related to the rising temperature of the ocean water near the coastal area, where ' +
    'starfish live. A higher reproduction rate of starfish is more often observed in warmer water. So when there is ' +
    'higher fossil fuel consumption, we often see an increase in the starfish population.\n' +
    '\n' +
    'Another association is the number of pharmaceutical factories nearby. The industry of medical products requires ' +
    'a unique component, the blood of horseshoe crabs. Horseshoe crab is one of the oldest animal species, and its ' +
    'blood can be used to detect toxins in medical products. As a result, pharmaceutical factories are usually built ' +
    'near where horseshoe crabs are abundant. Horseshoe crab is a major predator of larval CoT starfish, so fewer ' +
    'pharmaceutical factories are associated with fewer predators and more starfish, which is bad for the reef.\n' +
    '\n' +
    'Now, the final phenomenon that is associated with the increase of starfish population is the level of rainfall. ' +
    'Although the association is relatively weak, rainfall is linked with more activity of microbes that starfish ' +
    'feeds on. So an increase of rainfall is associated with the increase of the population of starfish.',
    'associative2', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which of the following factors mentioned by the article has the strongest relationship with the increase in the population of the CoT starfish?'],
    [['Fishing', 'Number of pharmaceutical factories', 'Level of rainfall', 'Fossil fuel consumption'],
        ['Fossil fuel consumption', 'Number of pharmaceutical factories nearby', 'Storm events', 'Level of rainfall']],
    [[2, 3, 4], [1]],
    ['Population of starfish', 'Fossil fuel consumption', 'Temperature of water', 'Number of pharmaceutical factories', 'Number of horseshoe crab', 'Level of rainfall', 'Activity of microbes'],
    ['1. Fossil fuel consumption and temperature of water:',
        '2. Temperature of water and population of starfish:',
        '3. Level of rainfall and activity of microbes:',
        '4. Activity of microbes and population of starfish:',
        '5. Number of pharmaceutical factories and number of horseshoe crab:',
        '6. Number of horseshoe crab and population of starfish:'])

var associative_context3 = new Context('What is associated with succulent plants\' ability to survive in the desert?\n' +
    '\n' +
    'Succulent plants often thrive in areas where people discover small desert mammals frequently. Obviously, ' +
    'opportunities to get water in the desert are few and farbetween. Generally, rains are light and short. ' +
    'And there\'s a limited window of time for any plant to get the water before it evaporates. Areas where ' +
    'succulent plants and small desert mammals appear together often contain soils that could hold water for ' +
    'a more extended period so that both animals and plants would stay hydrated more easily.\n' +
    '\n' +
    'One perhaps even more remarkable phenomenon associated with succulent plants\' survival is that people ' +
    'rarely see any other kinds of plants nearby where succulent plants grow. Some possible explanations ' +
    'might be: 1) succulent plants are so good at absorbing water from the soil so that water might become ' +
    'unavailable for other plants. 2) succulent plants usually grow fleshy leaves that attract animals so ' +
    'that they are more likely to be pollinated compared to other plants. 3) although it seems trivial, ' +
    'succulent plants tend to grow very large, casting a big area of shadow around and blocking out sunlight ' +
    'which is crucial for the growth of other herbs. And that means that most succulent plants don\'t have other plants nearby.',
    'associative3', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which one of the following factors mentioned by the article has the strongest relationship with succulent plants\' ability to survive in the desert?'],
    [['Water preserving soils',
        'No water available to other plants',
        'Fleshy leaves to increase chance of pollination',
        'Block out sunlight'],
        ['Appearance of small desert mammals',
            'No appearance of other plants',
            'Color',
            'Resistance to wind']],
    [[1, 2, 3, 4], [2]],
    ['Ability to survive in the desert', 'Small desert mammals',
        'Water preserving soils', 'No other plants', 'No water available to other plants',
        'Fleshy leaves', 'Block out sunlight'],
    ['1. Water preserving soils and appearance of small desert mammals:',
        '2. Appearance of small desert mammals and succulent plants\' ability to survive in the desert:',
        '3. No water available to other plants and no appearance of other plants:',
        '4. Fleshy leaves to increase chance of pollination and no appearance of other plants:',
        '5. Block out sunlight and no appearance of other plants:',
        '6. No appearance of other plants and succulent plants\' ability to survive in the desert:'])


var associative_context4 = new Context('Associations between animal species in a given ecosystem can get ' +
    'pretty complex. Here\'s a phenomenon discovered in an oak forest involving three different species: white-footed ' +
    'mice, gypsy moths, and oak trees. Oak trees produce acorns, and acorns are food sources for both white-footed ' +
    'mice and gypsy moths. So the size of the gypsy moth population is associated with the white-footed mice. \n' +
    '\n' +
    'However, the number of umbrellas sold can also be associated with the number of moths in a weaker way. ' +
    'When there is more rain in the given year, the number of moths tends to be lower, and the number of umbrellas ' +
    'rises. It is worth keeping in mind though the association between umbrellas sales and the size of the gypsy ' +
    'moth population is not as strong as the association between the number of white-footed mice and the number of ' +
    'gypsy moths. So, in summary, both the number of white-footed mice and the number of umbrellas sold in a given' +
    ' year are associated with the number of gypsy moths.\n' +
    '\n' +
    'Now, what makes this set of associations particularly interesting is that oak trees only produce a large ' +
    'number of acorns every few years. And whether the oak trees produce a large number of acorns is very strongly ' +
    'predicted by rainfall in that given year. So during the years with large rainfall, there will be large amounts ' +
    'of acorns, increasing the number of both white-footed mice and gypsy moths. However, keep in mind that rains ' +
    'are also contributing to an increase in the number of umbrellas sold in a given year. But since the association ' +
    'between umbrella sales and the number of moths is not as strong as the association between the number of mice ' +
    'and moths. Eventually, in this case,  we are more likely to see an increase in the gypsy moths population.\n',
    'associative4', ['1. Which of the following factors are mentioned in the passage (Choose all that apply)?',
        '2. Which one of the following factors mentioned by the article has the strongest relationship with gypsy moth population?'],
    [['White-footed mice', 'Umbrella sales', 'Acorns', 'Temperature'],
        ['Acorns production', 'Umbrella sales', 'Gypsy moths population', 'Number of oak trees']],
    [[1, 2, 3], [2]],
    ['Gypsy moth population', 'White-footed mice population', 'Umbrella sales', 'Acorns production'],
    ['1. White-footed mice population and gypsy moth population:',
        '2. Umbrella sales and gypsy moth population:',
        '3. Acorns production and gypsy moth population:',
        '4. Acorns production and White-footed mice population:'])

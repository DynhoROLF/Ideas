import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer }  from '@react-navigation/native';

const AppStack = createStackNavigator();

import Ideas  from './pages/Ideas';
import Detail from './pages/Detail';

export default function Routes(){
    return (
        <NavigationContainer screenOptions={ {headerShown: false} }>

            <AppStack.Navigator>
                    <AppStack.Screen name="Ideas"  component={Ideas} />
                    <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );

}
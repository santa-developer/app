import { Colors } from '@constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { NavTabProps } from './NavTabModel'
import { StyleSheet, Text, View } from 'react-native'

const Tab = createMaterialTopTabNavigator()

export default function NavTabScreen(
  props: NavTabProps
): JSX.Element {
  const { tabLabel, tabName, components, initialRoute } = props

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.wh }}
      // overScrollMode={'never'}
      initialRouteName={initialRoute}
      screenOptions={{
        tabBarPressOpacity: 5,
        tabBarAndroidRipple: {
          color: Colors.wh,
          borderless: true,
        },
        tabBarStyle: {
          backgroundColor: Colors.wh,
          borderColor: Colors.bl,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.nagative,
        tabBarInactiveTintColor: Colors.disabled,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.bl,
          borderBottomWidth: 2,
        },
      }}
    >
      {components &&
        components.map(
          (component: () => React.JSX.Element, index: number) => {
            return (
              <Tab.Screen
                key={index}
                name={tabName[index]}
                component={component}
                listeners={{
                  tabPress: (): void => {
                    if (props.onIndexChange) {
                      props.onIndexChange(index)
                    }
                  },
                }}
                options={{
                  tabBarLabel: ({ focused }): React.ReactNode => {
                    return (
                      <View style={styles.container}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color: focused
                                ? Colors.nagative
                                : Colors.disabled,
                            },
                          ]}
                        >
                          {tabLabel[index]}
                        </Text>
                      </View>
                    )
                  },
                }}
              />
            )
          }
        )}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
  },
})

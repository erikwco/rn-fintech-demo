import { View, Text } from 'react-native'
import React from 'react'
import RoundButton from './RoundButton'
import * as DropDown from 'zeego/dropdown-menu'

const DropDownMenu = () => {
  return (
    <DropDown.Root>
      <DropDown.Trigger>
        <RoundButton icon={'ellipsis-horizontal'} text='More' />
      </DropDown.Trigger>
      <DropDown.Content>

        <DropDown.Item key='statement'>
          <DropDown.ItemTitle>Statement</DropDown.ItemTitle>
          <DropDown.ItemIcon ios={{
            name: 'list.bullet.rectangle.fill',
            pointSize: 24,
          }} />
        </DropDown.Item>

        <DropDown.Item key='converter'>
          <DropDown.ItemTitle>Converter</DropDown.ItemTitle>
          <DropDown.ItemIcon ios={{
            name: 'coloncurrencysign.arrow.circlepath',
            pointSize: 24,
          }} />
        </DropDown.Item>

        <DropDown.Item key='account'>
          <DropDown.ItemTitle>Add new Account</DropDown.ItemTitle>
          <DropDown.ItemIcon ios={{
            name: 'plus.rectangle.on.folder.fill',
            pointSize: 24,
          }} />
        </DropDown.Item>

        <DropDown.Item key='background'>
          <DropDown.ItemTitle>Background</DropDown.ItemTitle>
          <DropDown.ItemIcon ios={{
            name: 'photo.fill',
            pointSize: 24,
          }} />
        </DropDown.Item>

      </DropDown.Content>
    </DropDown.Root>
  )
}

export default DropDownMenu

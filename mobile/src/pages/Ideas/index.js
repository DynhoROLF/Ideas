import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Ideas(){
    return (
        <View style={sryles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</ Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha uma ideia e salve o mundo!</Text>

            <FlatList 
                data={[1, 2, 3]}
                style={styles.ideaList}
                keyExtractor={idea => String(idea)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.idea}>
                    <Text style={styles.ideaProperty}>USER:</Text>
                    <Text style={styles.ideaValue}>Waldyr</Text>

                    <Text style={styles.ideaProperty}>CASO:</Text>
                    <Text style={styles.ideaValue}>Gatos em árvores</Text>

                    <Text style={styles.ideaProperty}>VALOR:</Text>
                    <Text style={styles.ideaValue}>R$ 150,00</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => {}}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';
import logoImg from '../../assets/Logo.png';
import styles from './styles';

export default function Ideas(){
    const navigation = useNavigation();

    const [ideas, setIdeas] = useState([]);
    const [totalIdeas, setTotalIdeas] = useState(0);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    function navigationToDetail(idea) {
        navigation.navigate('Detail', { idea });
    }

    async function loadIdeas() {
        if (loading) {
            return;
        }

        if (totalIdeas > 0 && ideas.length === totalIdeas) {
            return;
        }
        

        setLoading(true);

        const response = await api.get('ideas', {
            params: { page }
        });

        setLoading(false);
        setPage(page + 1);
        setIdeas([...ideas, ...response.data]);
        setTotalIdeas(response.headers['x-total-count']);
    }

    useEffect(() => {
        loadIdeas();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIdeas} Casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia </Text>

            <FlatList
                data={ideas}
                style={styles.ideaList} 
                showsVerticalScrollIndicator={false}
                keyExtractor={idea => String(idea.id)}
                //onEndReached={loadIdeas}
                //onEndReachedThreshold={0.2}
                renderItem={({ item: idea }) => (
                    <View style={styles.idea}>
                        <Text style={styles.ideaProperty}>User</Text>
                        <Text style={styles.ideaValue}>{idea.name}</Text>

                        <Text style={styles.ideaProperty}>Ideia</Text>
                        <Text style={styles.ideaValue}>{idea.title}</Text>

                        <Text style={styles.ideaProperty}>Valor</Text>
                        <Text style={styles.ideaValue}> {
                            Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            })
                            .format(idea.value)
                        }
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigationToDetail(idea)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais Detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#4158D0" />
                        </TouchableOpacity>
                    </View>
                )}
            /> 
        </View>
    );
};
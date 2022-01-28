import React from 'react';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';

import logoImg from '../../assets/Logo.png';

import styles from './styles'

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const idea = route.params.idea;
    const message = `Olá ${idea.name}, estou entrando em contato para pedir dinheiro para o caso ${idea.title},
     com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(idea.value)}.
     `

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${idea.title}`,
            recipients: [idea.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${idea.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#4158D0"/>
                </TouchableOpacity>
            </View>

            <View style={styles.idea}>
                <Text style={[styles.ideaProperty, { marginTop: 0 }]}>Idea</Text>
                <Text style={styles.ideaValue}>Descrição</Text>

                <Text style={styles.ideaProperty}>User:</Text>
                <Text style={styles.ideaValue}>{idea.name} de {idea.city}/{idea.uf}</Text>

                <Text style={styles.ideaProperty}>Descrição</Text>
                <Text style={styles.ideaValue}>{idea.description}</Text>

                <Text style={styles.ideaProperty}>Valor:</Text>
                <Text style={styles.ideaValue}> {
                            Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            })
                            .format(idea.value)
                        }
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o Herói desse caso!</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                
                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
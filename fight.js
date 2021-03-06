require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();


const fighthelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Fight help')
        .addFields(
            {name: `How to play`, value: `To join a match you have to type ${"`yes`"} (you have 60 seconds to accept the battle). After that the match starts. Each one of you have 1 turn per round. You can choose an abilitiy dependent on which round you're on and how many abilies you have used. The goal is simple, eliminate your opponent. Good Luck!` },
            { name: `Light attack`, value: `Activated by typing number ${"`1`"}; Deals 1 - 6 damage; Can be used at all times`  },
            { name: `Medium attack`, value: `Activated by typing number ${"`2`"}; Deals 1 - 11 damage; To use this attack you need to use your light attack at least 4 times`},
            { name: `Heavy attack`, value: `Activated by typing number ${"`3`"}; Deals 1 - 16 damage; To use this attack you need to use your medium attack at least 3 times`},
            { name: `Ultimate attack`, value: `Activated by typing number ${"`4`"}; Deals 50 damage; To use this attack you need to use all of your attacks (light - 4 times; medium - 3 times; heavy - 2 times); You can only use this attack once a game!`},
        )

      

        





client.on('ready', () => {
    console.log("Fight ready")
    
    });


client.on('message', msg=> {
    const prefix = '?';


    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  if (command == "fight") {
        if(!msg.mentions.users.first()) return msg.channel.send(`${msg.author.toString()}, you forgot to mention your enemy, b-baka!`);
        else {
                const mUser = msg.mentions.users.first()

                let {guild} = msg;

                mUser.send(`${msg.author.username} has requested to duel you in ${guild.name}! To accept the duel type ${"`yes`"}!`)

                  msg.reply(`${mUser.toString()}, do you accept the duel?`);
                  msg.channel.awaitMessages(m => m.author.id === mUser.id,
                        {max: 1, time: 60000}).then(collected => {
                         if (collected.first().content.toLowerCase() === 'yes') {

                                msg.reply(`Game starting!`)
                                msg.reply(`Player 1 is ${msg.author.toString()} and Player 2 is ${mUser.toString()}`)

                                const player1 = msg.author.toString() 
                                const player2 = mUser.toString()

                               let x
                               let y

                               let turn = 1
                                
                               let used1 = 0
                               let used2 = 0
                                
                               let lightUsed1 = 0
                               let lightUsed2 = 0

                               let mediumUsed1 = 0
                               let mediumUsed2 = 0

                               let heavyUsed1 = 0
                               let heavyUsed2 = 0

                              let light 
                              let medium
                              let heavy 
                              const ultimate = 50

                              

                          const endD = ["`end`", "`attacks`"]
                          



                                let health1 = 100
                                let health2 = 100

                                    game()

                      function game(){

                        
                    
                               
                                
                              if(turn == 1){
                                if(health1 > 0)  {
                                  msg.channel.send(`Please, choose an abilty, ${player1}! Remember, if you want to end the game, you can type ${endD[0]}. Also you can check your attacks by typing ${endD[1]}. `)

                                 msg.channel.awaitMessages(m => m.author.id == msg.author.id,
                                  {max: 1, time: 60000}).then(collected => { 
                                          if (collected.first().content.toLowerCase() == '1') {
                                            light = Math.floor(Math.random() * 5) + 1
                                            y = health2 - light
                                            health2 = y
                                            msg.channel.send(`${player1} used their light attack and dealt ${light} damage to ${player2} and they have ${health2} health left!`)
                                            turn++
                                            lightUsed1++
                                            game()    
                                          } 
                                          else if (collected.first().content.toLowerCase() == '2') {
                                            if(lightUsed1 >= 4){
                                            medium = Math.floor(Math.random() * 10) + 1
                                            y = health2 - medium
                                            health2 = y
                                            msg.channel.send(`${player1} used their medium attack and dealt ${medium} damage to ${player2} and they have ${health2} health left!`)
                                            turn++
                                            mediumUsed1++
                                            
          
                                            game()  
                                            }
                                            else{
                                               msg.channel.send(`You need to use your light attack at least 4 times!`)
                                               game()
                                            }  
                                          }
                                          else if (collected.first().content.toLowerCase() == '3') {
                                            if(mediumUsed1 >= 3){
                                            heavy = Math.floor(Math.random() * 15) + 1
                                            y = health2 - heavy
                                            health2 = y
                                            msg.channel.send(`${player1} used their heavy attack and dealt ${heavy} damage to ${player2} and they have ${health2} health left!`)
                                            turn++
                                            heavyUsed1++
          
                                            game()    
                                          }
                                          else{
                                            msg.channel.send(`You need to use your medium attack at least 3 times!`)
                                               game()
                                          }
                                        }
                                          else if (collected.first().content.toLowerCase() == '4') {
                                           if(mediumUsed1 >= 3 && lightUsed1 >= 4 && heavyUsed1 >= 2){
                                            if(used1 == 0){
                                              used1++
                                            y = health2 - ultimate
                                            health2 = y
                                            msg.channel.send(`${player1} used their ultimate attack and dealt ${ultimate} damage to ${player2} and they have ${health2} health left!`)
                                            turn++
          
                                            game()  
                                            } 
                                            
                                            else{
                                              msg.channel.send(`${player1}, you have already used your ultimate attack!`)
                                              game()
        
                                            }
                                          }else{
                                            msg.channel.send(`${player1}, you have to use all of your attacks before you're able to use your ultimate!`)
                                            game()
                                          }
                                        }
      
                                          else if (collected.first().content.toLowerCase() == 'end') {
                                            msg.channel.send(`Game ending!`)
                                            return;   
                                          }
                                          else if (collected.first().content.toLowerCase() == 'attacks') {
                                            msg.channel.send(fighthelp)          
                                           game()
                                          }
                                          else {
                                            msg.channel.send(`Something went wrong! Try again!`)
                                            return game();

                                          }
                                          
                                          
                                          
                                  }).catch(() => {
                                          msg.reply(`${player1} failed to respond in time, what a turtle!`);
                                          msg.channel.send(`${player2} has won!`)
                                          
                                          
                                  });
                          return;

                          
                      
                                }else{
                                  msg.channel.send(`${player2} has won!`)
                                  
                                  return;
                                }

                                }

                              if(turn == 2){

                                if(health2 > 0){

                                msg.channel.send(`Please, choose an abilty, ${player2}! Remember, if you want to end the game, you can type ${endD[0]}. Also you can check your attacks by typing ${endD[1]}. `)

                                msg.channel.awaitMessages(m => m.author.id == mUser.id,
                                  {max: 1, time: 60000}).then(collected => {
                                    
                                    if (collected.first().content.toLowerCase() == '1') {
                                      light = Math.floor(Math.random() * 5) + 1
                                      x = health1 - light
                                      health1 = x
                                      msg.channel.send(`${player2} used their light attack and dealt ${light} damage to ${player1} and they have ${health1} health left!`)
                                      turn--
                                      lightUsed2++
    
                                      game()    
                                    } 
                                    else if (collected.first().content.toLowerCase() == '2') {
                                      if(lightUsed2 >= 4){
                                      medium = Math.floor(Math.random() * 10) + 1
                                      x = health1 - medium
                                      health1 = x
                                      msg.channel.send(`${player2} used their medium attack and dealt ${medium} damage to ${player1} and they have ${health1} health left!`)
                                      turn--
                                      mediumUsed2++
    
                                      game()   
                                      }
                                      else{
                                        msg.channel.send(`You need to use your light attack at least 4 times!`)
                                               game()
                                      } 
                                    }
                                    else if (collected.first().content.toLowerCase() == '3') {
                                      if(mediumUsed2 >= 3){
                                      heavy = Math.floor(Math.random() * 15) + 1
                                      x = health1 - heavy
                                      health1 = x
                                      msg.channel.send(`${player2} used their heavy attack and dealt ${heavy} damage to ${player1} and they have ${health1} health left!`)
                                      turn--
                                      heavyUsed2++
    
                                      game()
                                      }
                                      else{
                                        msg.channel.send(`You need to use your medium attack at least 3 times!`)
                                               game()
                                      } 
                                    }
                                    else if (collected.first().content.toLowerCase() == '4') {
                                      if(mediumUsed2 >= 3 && lightUsed2 >= 4 && heavyUsed2 >= 2){
                                      if(used2 == 0){
                                        used2++
                                      x = health1 - ultimate
                                      health1 = x
                                      msg.channel.send(`${player2} used their ultimate attack and dealt ${ultimate} damage to ${player1} and they have ${health1} health left!`)
                                      turn--
    
                                      game()    
                                    }
                                    else{
                                      msg.channel.send(`${player2}, you have already used your ultimate attack!`)
                                      game()

                                    }
                                  }
                                  else{
                                    msg.channel.send(`${player2}, you have to use all of your attacks before you're able to use your ultimate!`)
                                    game()
                                  }
                                  }
                                
                                  else if (collected.first().content.toLowerCase() == 'attacks') {
                                    msg.channel.send(fighthelp)
                                   game()
                                  }
                                  
                                  else if (collected.first().content.toLowerCase() == 'end') {
                                    msg.channel.send(`Game ending!`)
                                     return;   
                                  }
                                  else {
                                    msg.channel.send(`Something went wrong! Try again!`)
                                    return game();

                                  }
                                         
                                  
                                  
                                  }).catch(() => {
                                          msg.reply(`${player2} failed to respond in time, what a turtle!`);
                                          msg.channel.send(`${player1} has won!`)
                                         
                                           
                                            
                                           
                                          
                                  });
                          return;

                                  
                        }
                        
                        else{
                          msg.channel.send(`${player1} has won!`)
                          
                           
                            
                          return;
                        }
                         
                              

                      }
                    }

                   }else{
                    msg.reply(`Game rejected by ${mUser.toString()}, c'mon man up!`); 
                    
                   }
                  }).catch(() => {
                    msg.reply(`${mUser.toString()} failed to accept in time, what a turtle!`);
            
    return;
                                
              })       
        }
                
}
        

});
client.login(process.env.TOKEN);




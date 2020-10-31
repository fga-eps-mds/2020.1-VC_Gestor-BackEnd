#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>

void trata_SIGTERM(int signum) {
   if (fork()) {
     printf("Meu filho continuara a tradicao da familia!\n");
     signal(SIGTERM, SIG_DFL); /* Reinstala tratador padrao e */
     raise(SIGTERM);           /* levanta SIGTERM para encerrar execucao*/
   }
 }

 int main() {
   signal(SIGTERM, trata_SIGTERM); /* Instala o tratador de sinal */
   
   while(1){
   	pause(); /* Interrompe a execucao e aguarda um sinal */	
   }
 
   return 0;
 }
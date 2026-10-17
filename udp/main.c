// UDP server in C, as part of understanding the OSI model and the underlying communication protocols that
// serve as the foundation of backend systems today
// Author: Mark Simon

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(int argc, char** argv ) {

    int port  = 5501;

    int sockfd;

    struct sockaddr_in myAddr, remoteAddr;

    char buffer [1024];

    socklen_t addr_size;
    
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    memset(&myAddr, '\0', sizeof(myAddr));

    myAddr.sin_family = AF_INET;
    myAddr.sin_port = htons(port);
    myAddr.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr*)&myAddr, sizeof(myAddr));

    addr_size = sizeof(remoteAddr);

    // char c;
    // while ((c = getchar()) != EOF){
    while(1 == 1) {
        recvfrom(sockfd, buffer, 1024, 0, (struct sockaddr*)& remoteAddr, &addr_size);
        printf("\n Received data from source IP: %s and Port: %u\n", inet_ntoa(remoteAddr.sin_addr), ntohs(remoteAddr.sin_port));

        printf("\nData in buffer:\n %s", buffer);
    }


    return 0;
}
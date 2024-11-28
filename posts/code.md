---
title: 'code随笔'
date: '2024-11-28'
tag:
	- code
---

## 数据库

### mysql

#### 清空表并重置自增id

```sql
truncate table tableName
```

## 配置文件

 ### jenkinsfile

```groovy
#!groovy
pipeline {

    agent any

    parameters {
        string(name: 'TAG_NAME', defaultValue: 'prod', description: 'test or prod')
    }

    environment {
        // GitLab 凭证 ID
        GITLAB_CREDENTIAL_ID = 'gitlab'
        // GitHub 账号名
        GITLAB_ACCOUNT = 'http://*.*.*.*:80/gie-technical-support/backend/gie-technical-support-server.git'
        // 应用部署服务器
        APP_DEPLOY_SERVER = '*.*.*.*'
    }

    stages {
        stage('检出prod') {
            when {
                expression {
                    params.TAG_NAME == 'prod'
                }
            }
            steps {
                git branch: 'main', credentialsId: "${GITLAB_CREDENTIAL_ID}",
                    url: "${GITLAB_ACCOUNT}"
            }
        }

        stage('检出test') {
            when {
                expression {
                    params.TAG_NAME == 'test'
                }
            }
            steps {
                git branch: 'test', credentialsId: "${GITLAB_CREDENTIAL_ID}",
                    url: "${GITLAB_ACCOUNT}"
            }
        }

        stage('验证检出结果') {
            steps {
                script {
                    if (fileExists('.git')) {
                        echo "Code successfully checked out."
                    } else {
                        error("Code checkout failed.")
                    }
                }
            }
        }

        stage('构建') {
            steps {
                sh 'mvn clean package -Dmaven.test.skip=true'
            }
        }

        stage('部署prod') {
            when {
                expression {
                    params.TAG_NAME == 'prod'
                }
            }
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "${APP_DEPLOY_SERVER}",
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: 'sh /data/publish/support/prod/deploy.sh',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '/data/publish/support/prod/build/',
                                    remoteDirectorySDF: false,
                                    removePrefix: 'target/',
                                    sourceFiles: 'target/*.jar')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: true)
                        ]
                )
            }
        }
        stage('部署test') {
            when {
                expression {
                    params.TAG_NAME == 'test'
                }
            }
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "${APP_DEPLOY_SERVER}",
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: 'sh /data/publish/support/test/app/deploy.sh',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '/data/publish/support/test/app/build/',
                                    remoteDirectorySDF: false,
                                    removePrefix: 'target/',
                                    sourceFiles: 'target/*.jar')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: true)
                        ]
                )
            }
        }
    }
}

```

### nginx反向代理配置

```shell
server {
    listen       80 ssl;
    server_name giesupport.*.com;
    // 最大传输文件
    client_max_body_size  36m;
    
    ssl_certificate /etc/nginx/ssl/giesupport.*.com.crt;
    ssl_certificate_key /etc/nginx/ssl/giesupport.*.com.key;

    location / {
        root   /usr/share/nginx/html/gie_support_ui;
        index  index.html index.htm;
        if (!-e $request_filename) {
  				rewrite ^(.*)$ /index.html?s=$1 last;
  				break;
  			}
    }
    // 代理天气接口防止访问报跨域错误
    location /weatherApi/ {
        proxy_pass https://weather.*.com/;
    }
    
    location ^~ /prod-api/ {
        proxy_pass http://127.0.0.1:80/;
        # proxy_pass http://*.*.*.6:80;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location ^~/kkfileview/ {
        proxy_buffering off;
  		  proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_pass http://127.0.0.1:80;
    }

}
```

### ovpnClient配置

#### 第一种

```shell
# 1
client
nobind
dev tun
remote-cert-tls server
comp-lzo
remote *.*.*.* 1194 tcp
;remote 127.0.0.1 1194 tcp
<key>
-----BEGIN PRIVATE KEY-----
***
-----END PRIVATE KEY-----
</key>
<cert>
-----BEGIN CERTIFICATE-----
****
-----END CERTIFICATE-----
</cert>
<ca>
-----BEGIN CERTIFICATE-----
***
-----END CERTIFICATE-----
</ca>
key-direction 1
<tls-auth>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
***
-----END OpenVPN Static key V1-----
</tls-auth>
verb 3
;redirect-gateway def1
# 配置网络路由，控制网络访问
route-nopull
route 192.168.253.0 255.255.255.0 vpn_gateway
```



#### 第二种

```shell
# 2
##############################################
# Sample client-side OpenVPN 2.0 config file #
# for connecting to multi-client server.     #
#                                            #
# This configuration can be used by multiple #
# clients, however each client should have   #
# its own cert and key files.                #
#                                            #
# On Windows, you might want to rename this  #
# file so it has a .ovpn extension           #
##############################################

# Specify that we are a client and that we
# will be pulling certain config file directives
# from the server.
client

# Use the same setting as you are using on
# the server.
# On most systems, the VPN will not function
# unless you partially or fully disable
# the firewall for the TUN/TAP interface.
;dev tap
dev tun

# Windows needs the TAP-Win32 adapter name
# from the Network Connections panel
# if you have more than one.  On XP SP2,
# you may need to disable the firewall
# for the TAP adapter.
;dev-node MyTap

# Are we connecting to a TCP or
# UDP server?  Use the same setting as
# on the server.
proto tcp
;proto udp

# The hostname/IP and port of the server.
# You can have multiple remote entries
# to load balance between the servers.
remote *.*.*.* 1194
;remote my-server-2 1194

# Choose a random host from the remote
# list for load-balancing.  Otherwise
# try hosts in the order specified.
;remote-random

# Keep trying indefinitely to resolve the
# host name of the OpenVPN server.  Very useful
# on machines which are not permanently connected
# to the internet such as laptops.
resolv-retry infinite

# Most clients don't need to bind to
# a specific local port number.
nobind

# Downgrade privileges after initialization (non-Windows only)
;user nobody
;group nobody

# Try to preserve some state across restarts.
persist-key
persist-tun

# If you are connecting through an
# HTTP proxy to reach the actual OpenVPN
# server, put the proxy server/IP and
# port number here.  See the man page
# if your proxy server requires
# authentication.
;http-proxy-retry # retry on connection failures
;http-proxy [proxy server] [proxy port #]

# Wireless networks often produce a lot
# of duplicate packets.  Set this flag
# to silence duplicate packet warnings.
;mute-replay-warnings

# SSL/TLS parms.
# See the server config file for more
# description.  It's best to use
# a separate .crt/.key file pair
# for each client.  A single ca
# file can be used for all clients.
ca ca.crt
cert client.crt
key client.key

# Verify server certificate by checking that the
# certicate has the correct key usage set.
# This is an important precaution to protect against
# a potential attack discussed here:
#  http://openvpn.net/howto.html#mitm
#
# To use this feature, you will need to generate
# your server certificates with the keyUsage set to
#   digitalSignature, keyEncipherment
# and the extendedKeyUsage to
#   serverAuth
# EasyRSA can do this for you.
remote-cert-tls server

# If a tls-auth key is used on the server
# then every client must also have the key.
tls-auth ta.key 1

# Select a cryptographic cipher.
# If the cipher option is used on the server
# then you must also specify it here.
;cipher x
cipher AES-256-CBC

# Enable compression on the VPN link.
# Don't enable this unless it is also
# enabled in the server config file.
comp-lzo

# Set log file verbosity.
verb 3

# Silence repeating messages
;mute 20

;redirect-gateway def1
# 不理睬以下网段
route 10.0.0.0 255.0.0.0 net_gateway
route 10.8.2.0 255.255.255.0 net_gateway
route 172.16.0.0 255.255.0.0 net_gateway
route 172.17.0.0 255.255.0.0 net_gateway
route 172.18.0.0 255.255.0.0 net_gateway
route 172.19.0.0 255.255.0.0 net_gateway
route 172.20.0.0 255.255.0.0 net_gateway
route 172.21.0.0 255.255.0.0 net_gateway
route 172.22.0.0 255.255.0.0 net_gateway
route 172.23.0.0 255.255.0.0 net_gateway
route 172.24.0.0 255.255.0.0 net_gateway
route 172.25.0.0 255.255.0.0 net_gateway
route 172.26.0.0 255.255.0.0 net_gateway
route 172.27.0.0 255.255.0.0 net_gateway
route 172.28.0.0 255.255.0.0 net_gateway
route 172.29.0.0 255.255.0.0 net_gateway
route 172.30.0.0 255.255.0.0 net_gateway
route 172.31.0.0 255.255.0.0 net_gateway
route 192.168.0.0 255.255.0.0 net_gateway
route 127.0.0.1 255.255.255.255 net_gateway
```




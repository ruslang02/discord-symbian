TEMPLATE = app
TARGET = discord-symbian_0xEA2EE72D
TARGET.UID3 = 0xEA2EE72D
TARGET.CAPABILITY += NetworkServices
TARGET.EPOCHEAPSIZE = 0x40000 0x4000000

VERSION = 1.0.0
DEFINES += APP_VERSION=\"$$VERSION\"

vendorinfo += "%{\"ruslang02\"}" ":\"ruslang02\""
my_deployment.pkg_prerules = vendorinfo

DEPLOYMENT += my_deployment
DEPLOYMENT.display_name = Discord
ICON = assets/logo.svg

QT += network

CONFIG += qt-components

folder_01.source = src/ui
folder_01.target = .
folder_02.source = src/js
folder_02.target = .
DEPLOYMENTFOLDERS = folder_01 folder_02

HEADERS += \
    src/cpp/Socket.h

SOURCES += \
    src/main.cpp \
    src/cpp/Socket.cpp

include(qmlapplicationviewer/qmlapplicationviewer.pri)
qtcAddDeployment()
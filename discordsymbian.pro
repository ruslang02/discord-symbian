

TEMPLATE = app
TARGET = tweetian

# Application version
VERSION = 1.8.3
DEFINES += APP_VERSION=\\\"$$VERSION\\\"

# Qt Library
QT += network

# Qt Mobility Library
CONFIG += mobility
MOBILITY += feedback location gallery

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


symbian{
    TARGET = tweetian_0xA00158E5
    TARGET.UID3 = 0xA00158E5
    TARGET.CAPABILITY += NetworkServices Location LocalServices ReadUserData WriteUserData
    TARGET.EPOCHEAPSIZE = 0x40000 0x4000000

    CONFIG += qt-components
    vendorinfo += "%{\"Dickson\"}" ":\"Dickson\""
    my_deployment.pkg_prerules = vendorinfo
    DEPLOYMENT += my_deployment
    DEPLOYMENT.display_name = Tweetian
    ICON = assets/logo.svg

    # Symbian have a different syntax
    DEFINES -= APP_VERSION=\\\"$$VERSION\\\"
    DEFINES += APP_VERSION=\"$$VERSION\"

    LIBS += -lavkon -lapgrfx -leikcore -lcone -lapmime
}

# Please do not modify the following two lines. Required for deployment.
include(qmlapplicationviewer/qmlapplicationviewer.pri)
qtcAddDeployment()

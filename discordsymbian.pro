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

QT += network sql

CONFIG += debug mobility qt-components

MOBILITY += mutlimedia feedback systeminfo
MOBILITY += publishsubscribe

folder_01.source = src/js
folder_01.target = .
DEPLOYMENTFOLDERS = folder_01

HEADERS += \
    src/cpp/Socket.h \
    src/cpp/Http.h \
    src/cpp/AvkonHelper.h

SOURCES += \
    src/main.cpp \
    src/cpp/Socket.cpp \
    src/cpp/Http.cpp \
    src/cpp/AvkonHelper.cpp

include(qmlapplicationviewer/qmlapplicationviewer.pri)
qtcAddDeployment()

!win32-g++ {
    DEFINES += USE_AVKON
    LIBS += -lavkon \
            -laknnotify \
            -lhwrmlightclient \
            -lapgrfx \
            -lcone \
            -lws32 \
            -lbitgdi \
            -lfbscli \
            -laknskins \
            -laknskinsrv \
            -leikcore \
            -lapmime \
            -lefsrv \
            -leuser \
            -lcommondialogs \
            -lesock \
            -lmediaclientaudio \
            -lprofileengine \
            -lcntmodel \
            -lbafl \
            -lmgfetch
}

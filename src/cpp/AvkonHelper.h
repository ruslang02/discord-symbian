#ifndef AVKONHELPER_H
#define AVKONHELPER_H

#include <QString>
#include <QObject>

class AvkonHelper : public QObject
{
    Q_OBJECT
public:
    AvkonHelper();
    Q_INVOKABLE void showPopup(QString title, QString message);
public slots:
    void cleanLastMsg() { lastPopup=""; }

private:
    QString lastPopup;
    bool _switchToApp;
};

#endif // AVKONHELPER_H

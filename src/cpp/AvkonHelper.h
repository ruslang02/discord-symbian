#ifndef AVKONHELPER_H
#define AVKONHELPER_H

#include <QString>
#include <QObject>

class QDeclarativeView;

class AvkonHelper : public QObject
{
    Q_OBJECT
public:
    explicit AvkonHelper(QDeclarativeView *view, QObject *parent = 0);
    Q_INVOKABLE void showPopup(QString title, QString message);
    Q_INVOKABLE void minimize() const;
public slots:
    void cleanLastMsg() { lastPopup=""; }

private:
    QDeclarativeView *m_view;
    QString lastPopup;
    bool _switchToApp;
};

#endif // AVKONHELPER_H

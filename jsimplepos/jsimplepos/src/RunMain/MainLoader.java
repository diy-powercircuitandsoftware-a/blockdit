package RunMain;

import DB.Config;
import UI.Main.MainFrame;

/**
 *
 * @author annopnod
 */
public class MainLoader {

   public static Config cfg = new Config("DB.Dat");

    public static void main(String[] args) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MainFrame().setVisible(true);
            }
        });
    }

}

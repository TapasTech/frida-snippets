import sys
import time
import atexit
import signal
import logging
import multiprocessing

logging.basicConfig(level=logging.DEBUG)

class W(multiprocessing.Process):
    def run(self):
        logging.debug("%s Started" % self.name)

        def log_terminate(num, frame):
             logging.debug("%s Terminated" % self.name)
             ##todo 放回pageid
             sys.exit()
        signal.signal(signal.SIGTERM, log_terminate)
        while True:
            time.sleep(10)

@atexit.register
def log_exit():
    logging.debug("Main process terminated")
    a.terminate()
    b.terminate()

logging.debug("Main process started")
a = W()
b = W()
a.start()
b.start()
time.sleep(1)

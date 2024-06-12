"""Logger module"""

import logging


def initLogger(name: str):
    """Main entry point for initializing the logger

    :param name: Name of the file calling the logger
    :return: Logger
    """
    log_format = "[%(filename)s:%(lineno)s - %(funcName)20s() ] %(asctime)s - %(levelname)s: - %(name)s - %(message)s"
    log_level = logging.DEBUG  # if settings.DEBUG else logging.INFO
    logging.basicConfig(format=log_format)

    logger = logging.getLogger(name)
    logger.setLevel(log_level)
    return logger
